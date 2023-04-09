export function PageWrapper(props){
    console.log(props)
    return (
        <div style=
        {{display:'flex', flexDirection:'column'}}
        >
        {props.children}
        </div>
    )
}; 