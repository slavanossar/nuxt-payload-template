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
export const TemplatePageFragmentDoc = gql`
    fragment TemplatePage on TemplatePage {
  id
  meta {
    description
    image {
      ...Image
    }
    title
  }
  template
  templatePageUri
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
  TemplatePages(limit: 1, where: {template: {equals: Home}}) {
    docs {
      ...TemplatePage
      homeTemplateFields {
        myTextField
      }
    }
  }
}
    ${TemplatePageFragmentDoc}`;