import gql from "graphql-tag";

export const GET_DISCIPLINE = gql`
  {
    queryDiscipline(first: 100) {
      id
      name
    }
  }
`;

export const GET_COURSE = gql`
  {
    queryCourse(first: 100) {
      code
      dates(first: 50) {
        dayOfWeek
        endTime
        location
        section
        startTime
      }
      description
      instructor
      discipline_id
      name
      sections
    }
  }
`;
