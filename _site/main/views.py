from django.views.generic import View
from django.http import HttpResponse
from .models import Bid, Message, OrderBook
from django.shortcuts import redirect, reverse
import pandas as pd
from django.utils import timezone


class BidExport(View):
    display_name = 'Bids export'
    url_name = 'export_bids'
    url_pattern = fr'bids/export'
    content_type = 'text/csv'

    def get(self, request, *args, **kwargs):
        events = Bid.objects.all().values('group__session__code',
                                          'group__id_in_subsession',
                                          'group__round_number',
                                          'trader__participant__code',
                                          'trader__virtual',
                                          'trader__is_mm',
                                          'contractor__participant__code',
                                          'contractor__virtual',
                                          'contractor__is_mm',
                                          'market',
                                          'value',
                                          'type',
                                          'timestamp',
                                          'closure_timestamp',
                                          'active',
                                          'cancelled'
                                          )
        df = pd.DataFrame(data=events)
        if df is not None and not df.empty:
            timestamp = timezone.now()
            curtime = timestamp.strftime('%m_%d_%Y_%H_%M_%S')
            csv_data = df.to_csv(index=False)
            response = HttpResponse(csv_data, content_type=self.content_type)
            filename = f'bids_{curtime}.csv'
            response['Content-Disposition'] = f'attachment; filename={filename}'
            return response
        else:
            return redirect(reverse('ExportIndex'))


class MessageExport(View):
    display_name = 'Messages export'
    url_name = 'export_messages'
    url_pattern = fr'message/export'
    content_type = 'text/csv'

    def get(self, request, *args, **kwargs):
        events = Message.objects.all().values(
            'id',
            'parent__group__session__code',
            'parent__group__id_in_subsession',
            'parent__group__round_number',
            'actor__participant__code',
            'actor__virtual',
            'actor__is_mm',
            'parent__market',
            'parent__value',
            'parent__type',
            'timestamp',
            'event_type'
        )
        df = pd.DataFrame(data=events)
        if df is  None or  df.empty:
            return redirect(reverse('ExportIndex'))
        df = df.sort_values(['id'])
        df.actor__virtual = df.actor__virtual.astype('int32')
        df.actor__is_mm = df.actor__is_mm.astype('int32')
        df.rename(columns={
            'id': 'message_id',
            'parent__group__session__code': 'session code',
            'parent__group__id_in_subsession': 'group id',
            'parent__group__round_number': 'round',
            'actor__participant__code': 'participant code',
            'actor__virtual': 'virtual',
            'actor__is_mm': 'market maker',
            'parent__market': 'market',
            'parent__value': 'price',
            'parent__type': 'direction',
        }, inplace=True)

        timestamp = timezone.now()
        curtime = timestamp.strftime('%m_%d_%Y_%H_%M_%S')
        csv_data = df.to_csv(index=False)
        response = HttpResponse(csv_data, content_type=self.content_type)
        filename = f'messages_{curtime}.csv'
        response['Content-Disposition'] = f'attachment; filename={filename}'
        return response



class LongOrderBookExport(View):
    display_name = 'Order book export (long format)'
    url_name = 'export_orderbook_long'
    url_pattern = fr'orderbook_long/export'
    content_type = 'text/csv'

    def get(self, request, *args, **kwargs):
        events = OrderBook.objects.all().values(
            'initiator_id',
            'initiator__timestamp',
            'initiator__parent__market',
            'initiator__parent__group__session__code',
            'initiator__parent__group__id_in_subsession',
            'initiator__parent__group__round_number',
            'initiator__actor__participant__code',
            'initiator__event_type',
            'price',
            'type'
        )
        df = pd.DataFrame(data=events)
        if df is  None or  df.empty:
            return redirect(reverse('ExportIndex'))

        df.loc[df.type == 'sell', 'altprice'] = df.price
        df.loc[df.type == 'buy', 'altprice'] = -df.price
        df = df.sort_values(['initiator_id', 'initiator__parent__market', 'altprice'])
        df.drop(['altprice'], axis='columns', inplace=True)

        df.rename(columns={
            'initiator_id': 'message_id',
            'initiator__timestamp': 'message timestamp',
            'initiator__parent__market': 'market',
            'initiator__parent__group__session__code': 'session code',
            'initiator__parent__group__id_in_subsession': 'group id',
            'initiator__parent__group__round_number': 'round',
            'initiator__actor__participant__code': 'participant code',
            'initiator__event_type': 'event type',
            'type': 'direction',
        }, inplace=True)

        timestamp = timezone.now()
        curtime = timestamp.strftime('%m_%d_%Y_%H_%M_%S')
        csv_data = df.to_csv(index=False)
        response = HttpResponse(csv_data, content_type=self.content_type)
        filename = f'long_orderbook_{curtime}.csv'
        response['Content-Disposition'] = f'attachment; filename={filename}'
        return response



class WideOrderBookExport(View):
    display_name = 'Order book export (wide format)'
    url_name = 'export_orderbook_wide'
    url_pattern = fr'orderbook_wide/export'
    content_type = 'text/csv'

    def get(self, request, *args, **kwargs):
        events = OrderBook.objects.all().values(
            'initiator__timestamp',
            'initiator_id',
            'initiator__parent__market',
            'price',
            'type'
        )
        df = pd.DataFrame(data=events)
        if df is  None or  df.empty:
            return redirect(reverse('ExportIndex'))

        df.loc[df.type == 'sell', 'altprice'] = df.price
        df.loc[df.type == 'buy', 'altprice'] = -df.price
        df = df.sort_values(['initiator_id', 'initiator__parent__market', 'altprice'])
        df.drop(['altprice'], axis='columns', inplace=True)


        df['bidnum'] = df.groupby(['initiator_id', 'initiator__parent__market', 'type']).cumcount()

        p = df.pivot_table(
            index=['initiator_id', 'initiator__timestamp','initiator__parent__market'],
            columns=['type', 'bidnum'],
            values='price'
        )
        p.columns = p.columns.map('{0[0]}_{0[1]}'.format)
        p.reset_index(level=['initiator_id', 'initiator__timestamp','initiator__parent__market'],inplace=True)
        p.rename(columns={
            'initiator_id': 'message_id',
            'initiator__timestamp': 'message timestamp',
            'initiator__parent__market': 'market',
            'type': 'direction',
        }, inplace=True)

        if p is not None and not p.empty:
            timestamp = timezone.now()
            curtime = timestamp.strftime('%m_%d_%Y_%H_%M_%S')
            csv_data = p.to_csv(index=False)
            response = HttpResponse(csv_data, content_type=self.content_type)
            filename = f'wide_orderbook_{curtime}.csv'
            response['Content-Disposition'] = f'attachment; filename={filename}'
            return response
        else:
            return redirect(reverse('ExportIndex'))
