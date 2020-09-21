const { ApolloServer, gql } = require('apollo-server-express');
const app = require('express')();
const express = require('express')
const jwt = require('jsonwebtoken');
var cors = require('cors')

app.use(cors())

//var upload = multer({ dest: '../assets/images' })


const _SECRET = 'A*m38FzEY,:ULmoNm^ucns|"SVISN,3&:oU&/m@,.ob*NFu|j&_+,:eA_ay9qWz*';


// const repository = require('../controllers/db')

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "../db/storia.db"
  }
});

const typeDefs = gql`

  type Listing {
    id: Int
    userID: Int
    userName:String
    title: String
    location: String
    description: String
    price: String
    surface:Int
    phone:String
    rooms:Int
    images:[Image]
  }
  
  type Image {
    id:Int
    src: String
    rel_id:Int
  }

  type User {
    id: Int,
    username: String
    email: String
  }

  type LoginResult {
    token: String
    success: Boolean,
    user: User
  }
  
  type RegisterResult {
    success: Boolean
    message: String
  }
  type ListingResult {
    success: Boolean
    message: String
  }
  input SrcArray {
    src: String
  }

  type Query {
    listings(id:Int, table:String, column:String, column_data:String):[Listing]
    me(token: String): User
  }

  type Mutation {
    login(username: String!, password: String!): LoginResult
    register(username: String!, password: String!, email: String!): RegisterResult
    addListing(username:String!,location:String!, description:String, price:String!,  surface:String!, rooms:String!, phone:String!, title:String!, src: [SrcArray]):ListingResult
  }
`;

const resolvers = {
  Query: {
    listings: async (_, args) => {
      if (args.id !== undefined) {
        const listings = await knex('listings').where('id', args.id);
        for (let i in listings) {
          listings[i].images = await knex('images').where('rel_id', listings[i].id);
        }
        return listings;
      } else {
        // const { listings } = await repository.getData(args.table, args.column, args.column_data);
        const listings = await knex('listings');
        for (let i in listings) {
          listings[i].images = await knex('images').where('rel_id', listings[i].id);
        }
        return listings;
      }
    },
    me: async (_, args) => {
      const { token } = args;
      try {
        // verify
        const response = await jwt.verify(token, _SECRET);

        console.log(response);
        return response.data

      } catch (e) {
        console.error(e);
      }
    }
  },
  Mutation: {
    login: async (_, args) => {
      const { username, password } = args;

      if (!username || !password) {
        return {
          success: false
        };
      }

      const userResult = await knex('users').where('username', username).andWhere('password', password).limit(1);
      if (userResult.length == 0) {
        return {
          success: false
        };
      }

      // create token
      const token = jwt.sign({
        data: userResult[0]
      }, _SECRET, { expiresIn: '1y' });

      return {
        success: true,
        token,
        user: userResult[0]
      }
    },
    register: async (_, args) => {
      const { username, email, password } = args;

      if (!username || !password || !email) {
        return {
          success: false,
          message: "All fields are required"
        };
      }

      let userResult;

      userResult = await knex('users').where('username', username).limit(1);
      if (userResult.length > 0) {
        return {
          success: false,
          message: "Username already exists"
        }
      }

      userResult = await knex('users').where('email', email).limit(1);
      if (userResult.length > 0) {
        return {
          success: false,
          message: "Email already exists"
        }
      }

      await knex('users').insert({ username, password, email });

      return {
        success: true,
        message: "Account succesfully created"
      }
    },
    addListing: async (_, args) => {
      const { username, location, description, price, rooms, phone, surface, title, userID, src } = args;
      if (!title) {
        return {
          succes: false,
          message: "Please fill in all the fields"
        }
      }
      try {
        // verify
        const verifyUser = await jwt.verify(username, _SECRET);
        let response = await knex('listings').insert({ userID:verifyUser.data.id, userName:verifyUser.data.username, description, rooms, surface, phone, location, title, price })
        console.log(response[0])
        src.map(async ({ src }) => await knex('images').insert({ rel_id: response[0], src }))
        return {
          success: true,
          message: "Listing created"
        }

      } catch (e) {
        console.error(e);
      }

    }

  }
}

const server = new ApolloServer({ typeDefs, resolvers });
var timeout = require('connect-timeout')
app.use('/static', express.static('../../upload'))//Setting resources path





server.applyMiddleware({ app });
app.listen({ port: 3002 }, () =>
  console.log(`🚀 Server ready at http://rinx.tplinkdns.com:3002${server.graphqlPath}`)
)















