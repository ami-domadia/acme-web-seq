const app=require('supertest') (require('./app'));
const {expect}=require('chai')
const db=require('./db')

describe('app', ()=>{
    let pageMap={
        Home: {
            id: 1
        }
    }
    describe('GET /', ()=>{
        beforeEach(()=>db.syncAndSeed())
        
        it('redirect to the home page',()=>{
            return app.get('/')
            .expect(302)
            .then(response=>{
                expect(response.headers.location).to.equal(`/pages/${pageMap.Home.id}`)
            })
        })
    })
})