import { PositionCard } from '@/components/molecules/PositionCard'

export type AboutMeProps = {
  title: string
  description: string[]
  positions: {
    startDate: string
    endDate: string
    title: string
    company: string
    description: string
  }[]
}

const ROWS = 3

export const AboutMe = ({ title, description, positions }: AboutMeProps) => {
  return (
    <section
      className="container flex flex-col md:flex-row gap-10 md:gap-20"
      id="aboutMe"
    >
      <div className="flex flex-col gap-10 shrink-0">
        <h2
          className="title-font [&>span]:md:ml-16.5 [&>span]:ml-6 [&>span]:leading-6 [&>span]:md:leading-12 [&>span]:block [&>span]:text-primary"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="flex flex-col gap-4">
          {description.map((desc, index) => (
            <p
              key={desc + index}
              className="max-w-150 body-small md:body-large text-muted [&_strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid grid-rows-3 grid-flow-col auto-cols-[minmax(320px,1fr)] w-max">
          {positions.map((position, index) => (
            <PositionCard
              key={position.title + index}
              position={position}
              isFirstRow={index % ROWS === 0}
            />
          ))}
        </div>
      </div>

      {/* mobile: natywny swipe */}
      <div className="md:hidden overflow-x-auto scroll-smooth [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-6 w-max">
          {positions.map((position, index) => (
            <div
              key={position.title + index}
              className="snap-start w-[80vw] shrink-0"
            >
              <PositionCard position={position} isFirstRow />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
