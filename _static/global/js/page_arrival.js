function sendValue(info) {
    liveSend(info);
}
$(() => {
    const now = new Date(); 
    sendValue({ time: now.toString(),
    milliseconds: now.getMilliseconds(),
    offset: now.getTimezoneOffset(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone})
})