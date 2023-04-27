import gql from 'graphql-tag';
export const ImageFragmentDoc = gql`
    fragment Image on Image {
  description
  id
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
  }
  url
  width
}
    `;
export const GetGlobalsDocument = gql`
    query GetGlobals {
  Seo {
    meta {
      description
    }
    opengraph {
      description
      image {
        ...Image
      }
    }
  }
}
    ${ImageFragmentDoc}`;
export const GetImageDocument = gql`
    query GetImage($id: String!) {
  Image(id: $id) {
    ...Image
  }
}
    ${ImageFragmentDoc}`;