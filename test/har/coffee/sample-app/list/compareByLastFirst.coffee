define ->
    
    ###
    Custom comparator to sort contacts by last name, and then
    by first name.
    NOTE: This algorithm would likely need to be internationalized
    @param {object} contact1
    @param {object} contact2
    @return {number} 0 if contact1 and contact2 have the same last and first name
    -1 if contact1 is alphabetically before contact2
    1 if contact1 is alphabetically after contact2
    ###
    
    ###
    Compare two strings case-insensitively
    @param {string} name1
    @param {string} name2
    @returns {number} 0 if name1 == name2
    -1 if name1 < name2
    1 if name1 > name2
    ###
    compareName = (name1, name2) ->
        name1 = ''    unless name1?
        name2 = ''    unless name2?
        name1 = name1.toLowerCase()
        name2 = name2.toLowerCase()
        (if name1 < name2 then -1 else (if name1 > name2 then 1 else 0))
    return (contact1, contact2) ->
        result = compareName(contact1.lastName, contact2.lastName)
        result = compareName(contact1.firstName, contact2.firstName)    if result is 0
        result

    return
