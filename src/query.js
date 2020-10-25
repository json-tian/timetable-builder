import gql from "graphql-tag";

export const GET_DISCIPLINE = gql`
  {
    queryDiscipline(first: 10) {
      id
      name
    }
  }
`;
