import { useRowLabel } from '@payloadcms/ui'

/**
 * Creates a custom array RowLabel
 * @param defaultLabel The default label to use when label is empty
 * @param label The custom label
 * @returns A component render function
 */

interface CreateCustomRowLabelOptions<T> {
  defaultLabel: string
  index?: number
  label?: string
}

const createCustomRowLabel = <T extends Record<string, any>>({
  defaultLabel,
  index,
  label,
}: CreateCustomRowLabelOptions<T>) => {
  const RowLabel = () => {
    const zeroPadIndex = String((index || 0) + 1).padStart(2, '0')

    return (
      <div>
        {label
          ? [zeroPadIndex, label].join(' ␥ ')
          : [defaultLabel, zeroPadIndex].join(' ')}
      </div>
    )
  }

  RowLabel.displayName = 'CustomRowLabel'

  return RowLabel
}

export default createCustomRowLabel
