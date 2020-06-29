const { ApolloServer, gql } = require("apollo-server");
const { MongoMemoryServer } = require("mongodb-memory-server");
const getMongoConnection = require("./getMongoConnection");

// don't require a separate mongodb instance to run
new MongoMemoryServer({ instance: { port: 27017 } });

// this API is just an example, you can modify any parts if needed for the task
const typeDefs = gql`
    type Note {
        id: ID!
        midiNumber: Int
        timestamp: Int
    }

    input NoteInput {
        midiNumber: Int
        timestamp: Int
    }

    type Song {
        _id: ID!
        title: String
        keyStrokes: [Note]
    }

    type Query {
        songs: [Song]
    }

    type Mutation {
        addSong(title: String, keyStrokes: [NoteInput]): Song
    }
`;

const resolvers = {
    Query: {
        songs: async () => {
            const mongodb = await getMongoConnection();
            return mongodb
                .collection("songs")
                .find({})
                .toArray();
        },
    },
    Mutation: {
        addSong: async (_, { title, keyStrokes }) => {
            const mongodb = await getMongoConnection();
            const newSong = { title, keyStrokes };
            const response = await mongodb.collection("songs").insertOne(newSong);

            return { ...newSong, _id: response.insertedId };
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`GraphQL server running: ${url}`);
});
