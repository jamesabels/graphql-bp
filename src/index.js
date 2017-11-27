import { graphql } from 'graphql';
import schema from "./graphql/schema";

const query = `
    {
        todos { 
            id
            title
            content
        }
    }
`;

graphql(schema, query)
.then(res => {
    console.log('RESULT!! ', JSON.stringify(res, null, 2));
})
.catch(err => {
    console.log(err);
});