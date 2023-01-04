import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Input } from "antd";
import io from "socket.io-client";

// no dotenv
const socket = io.connect("http://localhost:7077");

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [obj, setobj] = useState(0);
  const showModal = (arg) => {
    setobj(arg);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    socket.emit("hello-event", { ...obj });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    socket.on("hello-event-listen", (payload) => {
      console.log("hello-event-listen", payload);
    });
  }, [socket]);

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "job",
      dataIndex: "job",
      key: "job",
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Edit",
      dataIndex: "Edit",
      key: "Edit",
      render: (text, record) => {
        return (
          <Button
            onClick={() => {
              showModal(record);
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];
  const dataSource = [
    {
      name: "harish",
      job: "React.js",
      location: "Nizamabad",
    },
    {
      name: "Kalyan",
      job: "Angualr.js",
      location: "Hyderabad",
    },
    {
      name: "Vinod",
      job: "UI",
      location: "Hyderabad",
    },
    {
      name: "suman",
      job: "SQL",
      location: "Hyderabad",
    },
  ];
  return (
    <div>
      <h1 className="color">User Deatiles</h1>
      <Table dataSource={dataSource} columns={columns} />;
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="modelEdit">
          <div className="fields">
            {" "}
            <span>author:</span>{" "}
            <span>
              {" "}
              <Input
                onChange={(e) => {
                  const value = e.target.value;
                  setobj((prev) => ({
                    ...prev,
                    name: value,
                  }));
                }}
                value={obj.name}
              />
            </span>
          </div>{" "}
          <div className="fields">
            {" "}
            <span>job:</span>
            <span>
              {" "}
              <Input
                onChange={(e) => {
                  const value = e.target.value;
                  setobj((prev) => ({
                    ...prev,
                    job: value,
                  }));
                }}
                value={obj.job}
              />
            </span>
          </div>
          <div className="fields">
            {" "}
            <span> location:</span>
            <span>
              {" "}
              <Input
                onChange={(e) => {
                  const value = e.target.value;
                  setobj((prev) => ({
                    ...prev,
                    location: value,
                  }));
                }}
                value={obj.location}
              />
            </span>
          </div>
        </div>
        {/* <button onClick={showModal}>Edit</button> */}
      </Modal>
    </div>
  );
}

export default App;
