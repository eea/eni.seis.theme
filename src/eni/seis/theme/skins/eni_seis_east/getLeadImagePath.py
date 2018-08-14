##parameters=size,fallback='event-fallback.png'

event = context

if event.portal_type == 'eea.meeting':
    if event.image is not None:
        return event.absolute_url() + '/@@images/image/preview'

try:
    img = event.getImage()
except Exception:
    img = None

if img:
    return event.absolute_url() + '/@@images/image/' + size

return context.portal_url() + '/' + fallback
