export default function PrevWork() {


  const prevWork = [
    {
        _id: '1',
        title: "Project 1",
        client: "Sam Disuja",
        description: "This is a project description"
    },
    {
        _id: '2',
        title: "Project 1",
        client: "Sam Disuja",
        description: "This is a project description"
    },
  ]


  return (
    <>
      {prevWork.map((work, index) => (
        
        <div key={work._id}>
        <div className="col">
            <h5 className="m-b-10 f-w-600">{work.title}</h5>
            <h6 className="text-muted f-w-400">{work.client}</h6>
            <p>{work.description}</p>
            <hr style={{ width: "70%", borderColor: "#AAA" }} />
        </div>
        </div>
        
      ))}
    </>
  );
}
