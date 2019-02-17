const Sequelize=require('sequelize')
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/acme_web_seq'
const orm = new Sequelize(DATABASE_URL, {logging: false})

const Page = orm.define('page', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
});
  
  const Content = orm.define('content', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
  });

  

  async function syncAndSeed(){
    //console.log('I am in syncandseed')
    try{
        Page.hasOne(Content)
        Content.belongsTo(Page)
        await orm.sync({force: true})
        const pages=await Promise.all([Page.create({title: 'Home'}),
                            Page.create({title: 'Employees'}),
                            Page.create({title: 'Contact'})])
        const contents=await Promise.all([Content.create({title: 'Home',
                            body: 'Welcome Home 1 <br> xoxoxo <br> Welcome Home 2 <br> xoxoxo'}),
                            Content.create({title: 'Employees',
                            body: 'MOE <br> CEO <br> LARRY <br> CTO <br> CURLY <br> COO'}),
                            Content.create({title: 'Contact',
                            body: 'Phone <br> 212-555-1212 <br> Telex <br> 212-555-1213 <br> FAX <br> 212-555-1214'})])
        for (let i=0;i<pages.length;i++){
            await pages[i].setContent(contents[i])
        }
    }
    catch{
        throw 'Did not sync!'
    }
  }
  
  

  module.exports = {
    Page, Content, syncAndSeed
  }