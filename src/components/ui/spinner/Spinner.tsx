import './spinner.css';

interface Props {
  className: string;
  classNameChilds: string;
}

export const Spinner = ({className, classNameChilds} : Props) => {
  return (
    <div className={`spinner ${className}`}>
      <div className={`bounce1 ${classNameChilds}`}></div>
      <div className={`bounce2 ${classNameChilds}`}></div>
      <div className={`bounce3 ${classNameChilds}`}></div>
    </div>
  )
}
