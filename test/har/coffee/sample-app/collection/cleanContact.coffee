define ->
    (contact) ->
        contact.firstName = contact.firstName and contact.firstName.trim() or ''
        contact.lastName = contact.lastName and contact.lastName.trim() or ''
        contact.phone = contact.phone and contact.phone.trim() or ''
        contact.email = contact.email and contact.email.trim() or ''
        contact
