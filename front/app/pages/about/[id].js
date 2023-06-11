// export function getAboutIndex {
// }

const About = ({detail}) => {
    // const [details, detailState] = useState(detail);

    console.log(detail);

    return(
        <>
            <h1>{detail.facility_name}</h1>
            <h3>{detail.address}</h3>
        
        </>
    )
}


export const getServerSideProps = async (context) => {
    console.log(context);
    const id = context.query.id;
    const response = await fetch(`http://api:3000/locations/${id}`, { method: "GET" });
    const json = await response.json();
    console.log(response);
    return {
      props: {
        detail: json,
        address: id,//idがきちんと取れてるかの確認用
      },
    };
}

export default About;
  