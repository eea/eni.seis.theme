##parameters=size,fallback='event-fallback.png'

event = context
try:
    img = event.restrictedTraverse('image')
except AttributeError:
    img = None

if img:
    return event.absolute_url() + '/@@images/image/' + size

return context.portal_url() + '/' + fallback
