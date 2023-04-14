export default function PageWrapper(props) {
  console.log(props);
  return (
    <div
      style={{
        // display: 'flex',
        // flexFlow: 'row',
        backgroundColor: "lightgray",
        margin: "5vh",
        padding: "2vh",
      }}
    >
      {props.children}
    </div>
  );
}
