import Image from "next/image"

export default function BorrowStepsItem (props) {
  const {id, src, title, description} = props
  const upperCase = id.toUpperCase()
  return (
    <div className="flex flex-col items-center">
      <Image src={src} alt={`borrow-${id}`} width={200} height={200} />
      <div className="text-center">
        <h5 className="text-xl font-bold">{title}</h5>
        <p className="">
          <span className="text-olive-100 font-semibold">{upperCase}</span> {description}
        </p>
      </div>
    </div>
  );
}