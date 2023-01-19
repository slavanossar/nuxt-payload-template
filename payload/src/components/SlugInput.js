import React, { useEffect } from 'react'
import { TextInput, useFormFields, useField } from 'payload/components/forms'
import dashify from 'dashify'

export default ({ name, path, label }) => {
  const titleField = useFormFields(([fields]) => fields.title)

  const { showError, value, setValue } = useField({
    path,
    enableDebouncedValue: true,
  })

  useEffect(() => {
    const charLimit = 40
    const slug = dashify(titleField.value || '')

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
  }, [titleField])

  return (
    <TextInput
      path={path}
      name={name}
      value={value || ''}
      label={label}
      readOnly
      showError={showError}
      onChange={() => undefined}
    />
  )
}
