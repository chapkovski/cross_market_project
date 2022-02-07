from django.views.generic import View
from django.http import HttpResponse
from .models import Bid
from django.shortcuts import redirect, reverse
import pandas as pd
from django.utils import timezone


class PandasExport(View):
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
