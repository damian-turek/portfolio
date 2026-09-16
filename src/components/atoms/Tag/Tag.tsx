import { cva } from 'class-variance-authority'

export type TagProps = {
  text: string
  variant?: 'small' | 'medium' | 'large'
}

export const tagStyles = cva('w-fit h-fit text-muted border border-muted', {
  variants: {
    variant: {
      small: 'px-3 py-1 label-font',
      medium:
        'px-2 md:px-4 py-1 md:py-2 label-font-spaced text-[10px] md:text-[12px] transition duration-200 ease-in-out hover:text-primary',
      large:
        'bg-black border border-black box-border text-white transition duration-200 ease-in-out hover:text-primary text-[20px] md:text-[30px] section-header-font px-4 md:px-6 py-2',
    },
  },
  defaultVariants: {
    variant: 'small',
  },
})

export const Tag = ({ text, variant }: TagProps) => {
  const styles = tagStyles({
    variant,
  })

  return <div className={styles}>{text}</div>
}
