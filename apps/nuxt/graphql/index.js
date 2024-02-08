import gql from 'graphql-tag';
export const ImageFragmentDoc = gql`
    fragment Image on Image {
  id
  description
  width
  height
  blurhash
  webp {
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
}
    `;
export const PageFragmentDoc = gql`
    fragment Page on Page {
  id
  meta {
    description
    image {
      ...Image
    }
    title
  }
  template
}
    ${ImageFragmentDoc}`;
export const GetGlobalsDocument = gql`
    query GetGlobals {
  Site {
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
  Pages(where: {template: {equals: Home}}) {
    docs {
      ...Page
      homeFields {
        myTextField
      }
    }
  }
}
    ${PageFragmentDoc}`;
export const GetImageDocument = gql`
    query GetImage($id: String!) {
  Image(id: $id) {
    ...Image
  }
}
    ${ImageFragmentDoc}`;