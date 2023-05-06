import { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 200, y: 100 },
    type: "input",
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 400, y: 200 },
  },
];

const initialEdges = [];

const Home = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const addNode = () => {
    const lastNodePosition =
      nodes.length > 0 ? nodes[nodes.length - 1].position : { x: 200, y: 50 };
    const newNode = {
      id: Date.now().toString(),
      type: "default",
      position: { x: lastNodePosition.x + 60, y: lastNodePosition.y + 40 },
    };
    setNodes([...nodes, newNode]);
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Background />
          <Controls />
        </ReactFlow>
        <button
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            backgroundColor: "blue",
            border: "none",
            color: "white",
            padding: "1rem 2rem",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            borderRadius: "10px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
            cursor: "pointer",
          }}
          onClick={addNode}
        >
          Add Node
        </button>
      </div>
    </>
  );
};

export default Home;
