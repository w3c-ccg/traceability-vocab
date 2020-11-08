const issuer = require('../services/issuer')

it('can issue / verify vanilla', async ()=>{
    const { verified} = await issuer.issue({
        credentialSubject: {
            id: 'did:example:123',
        }
      })
    expect(verified).toBe(true)
})

it('should error when terms are not defined', async ()=>{
    try {
        await issuer.issue({
            credentialSubject: {
                id: 'did:example:123',
                magicalFoo: 'barbar'
            }
          })
    } catch(e) {
        expect(e.message).toBe('The property \"magicalFoo\" in the input was not defined in the context.')
    }
})