##parameters=size,fallback='event-fallback.png'

event = context
try:
    img = event.getImage()
except Exception:
    img = None

if img:
    return event.absolute_url() + '/@@images/image/' + size

return context.portal_url() + '/' + fallback
