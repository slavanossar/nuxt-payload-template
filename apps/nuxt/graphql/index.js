import gql from 'graphql-tag';
export const ImageFragmentDoc = gql`
    fragment Image on Image {
  id
  description
  width
  height
  sizes {
    xs {
      url
      width
    }
    sm {
      url
      width
    }
    md {
      url
      width
    }
    lg {
      url
      width
    }
    xl {
      url
      width
    }
    xxl {
      url
      width
    }
    xxxl {
      url
      width
    }
    opengraph {
      url
      width
    }
  }
}
    `;
export const KeyPageFragmentDoc = gql`
    fragment KeyPage on KeyPage {
  id
  meta {
    description
    image {
      ...Image
    }
    title
  }
  template
  keyPageUri
}
    ${ImageFragmentDoc}`;
export const GetGlobalsDocument = gql`
    query GetGlobals {
  SiteSettings {
    meta {
      title
      description
      image {
        ...Image
      }
    }
  }
}
    ${ImageFragmentDoc}`;
export const GetHomePageDocument = gql`
    query GetHomePage {
  KeyPages(limit: 1, where: { template: { equals: Home } }) {
    docs {
      ...KeyPage
      homeTemplateFields {
        myTextField
      }
    }
  }
}
    ${KeyPageFragmentDoc}`;