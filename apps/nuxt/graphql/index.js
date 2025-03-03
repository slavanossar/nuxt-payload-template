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
export const VideoThumbnailFragmentDoc = gql`
    fragment VideoThumbnail on VideoThumbnail {
  id
  url
  width
  height
  sizes {
    thumbnail {
      url
      width
    }
  }
}
    `;
export const VideoFragmentDoc = gql`
    fragment Video on Video {
  id
  url
  thumbnail {
    ...VideoThumbnail
  }
}
    ${VideoThumbnailFragmentDoc}`;
export const GetGlobalsDocument = gql`
    query GetGlobals {
  Settings {
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
  Pages(limit: 1, where: {template: {equals: Home}}) {
    docs {
      ...Page
      homeTemplateFields {
        myTextField
      }
    }
  }
}
    ${PageFragmentDoc}`;