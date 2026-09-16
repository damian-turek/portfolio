import { cn } from '@/lib/utils'
import { AboutMeProps } from '@/components/organisms/AboutMe'

export const PositionCard = ({
  position,
  isFirstRow,
}: {
  position: AboutMeProps['positions'][number]
  isFirstRow: boolean
}) => (
  <div
    className={cn(
      'flex py-7 gap-10 pr-10 border-b border-muted/20',
      isFirstRow && 'border-t border-muted/20'
    )}
  >
    <p
      className="button-font text-accent whitespace-nowrap"
      dangerouslySetInnerHTML={{
        __html: position.startDate + ' - ' + position.endDate,
      }}
    />
    <div className="flex flex-col gap-3">
      <p
        className="body-large tiles-title-font"
        dangerouslySetInnerHTML={{ __html: position.title }}
      />
      <p
        className="label-font-spaced"
        dangerouslySetInnerHTML={{ __html: position.company }}
      />
      <p
        className="body-small md:body-medium text-muted max-w-120"
        dangerouslySetInnerHTML={{ __html: position.description }}
      />
    </div>
  </div>
)
