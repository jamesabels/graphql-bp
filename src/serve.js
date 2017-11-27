import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';

const app = express();
const PORT = 8080;

app.use('/graphql', graphqlHTTP((req, res, graphQLParams) => ({
    schema,
    graphiql: true
})));


app.listen(PORT, () => {
    console.log('GraphQL server listening on port %s', PORT);
});