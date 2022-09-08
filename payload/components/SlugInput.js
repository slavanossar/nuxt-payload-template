import React, { useEffect } from 'react'
import { TextInput, useWatchForm, useField } from 'payload/components/forms'
import { kebabCase, noop } from 'lodash'

export default ({ name, path, label }) => {
  const { getDataByPath } = useWatchForm()

  const { showError, value, setValue } = useField({
    path,
    enableDebouncedValue: true,
  })

  const titleValue = getDataByPath('title')

  useEffect(() => {
    const charLimit = 40
    const slug = kebabCase(titleValue)

    if (value === undefined && !slug.length) {
      setValue('')
    } else if (value !== undefined && value !== slug) {
      if (slug.length <= charLimit) {
        setValue(slug)
      } else {
        const trimmedSlugSegments = []

        slug.split('-').forEach((segment) => {
          let trimmedSlugLength = trimmedSlugSegments.join('-').length

          if (trimmedSlugSegments.length > 1) {
            trimmedSlugLength++
          }

          if (segment.length + trimmedSlugLength <= charLimit) {
            trimmedSlugSegments.push(segment)
          }
        })

        setValue(trimmedSlugSegments.join('-'))
      }
    }
  }, [titleValue])

  return (
    <TextInput
      path={path}
      name={name}
      value={value || ''}
      label={label}
      readOnly
      showError={showError}
      onChange={noop}
    />
  )
}
