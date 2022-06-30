import { useEffect, useState } from "react";
import styled from "styled-components";
import { useChangeNodeName, useGetMyNodes, useGetNodesNames } from "../../hooks";
import { formatTime } from "../../utils/helpers";
import { toast } from 'react-toastify';
import { FaRegEdit, FaCheckCircle } from 'react-icons/fa';

const NodeListTable = () => {
    const myNodes = useGetMyNodes();
    const [editNodeNumber, setEditNodeNumber] = useState<Number>();
    const [nodeName, setNodeName] = useState('');

    const [processing, setProcessing] = useState(false);
    const {state: renameState, send: changeNodeName} = useChangeNodeName();

    useEffect(() => {
        if (processing) {
          renameState.status === 'Exception' &&
            toast.error(renameState.errorMessage);
            renameState.status === 'Success' &&
            toast.info(`You've changed Node name.`);
          (renameState.status === 'Exception' ||
          renameState.status === 'Success') &&
            setProcessing(false);
            if (renameState.status === 'Success') {
              setEditNodeNumber(-1);
            }
        } else {
          setEditNodeNumber(-1);
        }
      }, [renameState, processing]);

      const handleKeyDown = (e: any, oldName: string) => {
        
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          
          handleSubmit(oldName);
        }
      };
    
      const handleBlur = (e:any) => {
        console.log('bur:');
        e.preventDefault();
        if (!processing)
          setEditNodeNumber(-1);
        return;
      }
    
      const handleSubmit = async (name: string) => {
        console.log('submit:', name, nodeName);
        try {
          changeNodeName(name, nodeName);
          setNodeName(nodeName);
          setProcessing(true);
        } catch(e: any) {
          toast.warning(e.message)
          setProcessing(false);
          setEditNodeNumber(-1);
        }
      };
    
      const editNode = (index: number, name: string) => {
        setEditNodeNumber(index);
        setNodeName(name);
      };

    return (
        <Table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Created</th>
                <th>My Reward</th>
                <th>Manage</th>
                </tr>
            </thead>
            <tbody>
                {
                    myNodes.map((node, index) => (
                        (node.time !== '0') && 
                        <tr key={`myNode-${index}`}>
                            <td>
                                {
                                 editNodeNumber === index ?    
                                 ( <input
                                    className={`px-2 py-1 outline-none ${
                                    editNodeNumber == index
                                        ? 'editable '
                                        : 'non-editable'
                                    }`}
                                    value={nodeName}
                                    onChange={(e) => setNodeName(e.target.value)}
                                    onBlur={(e) => handleBlur(e)}
                                    onKeyDown={(e) => handleKeyDown(e, node.name)}
                                />) : (<span>{node.name}</span>)
                                }
                                
                            </td>
                            <td>{formatTime(parseInt(node.time))}</td>
                            <td>{node.reward}</td>
                            <td>
                                {
                                    index === editNodeNumber ? <FaCheckCircle className="btn-action" onClick={(e) => {e.preventDefault(); handleSubmit(node.name)}}/> : 
                                    <FaRegEdit className="btn-action" onClick={() => editNode(index, node.name)}/>
                                }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

export default NodeListTable;

const Table = styled.table`
    width: 100%;
    min-width: 600px;
    text-align: start;
    color: white;
    .editable {
        border-radius: 4px;
        border: 1px solid gray;
        background: #fffbfba6;
    }
    .non-editable {
        border: none;
        background: transparent;
    }
    tr, input {
        display: flex;
        font-size: 16px;
    }
    th {
        font-size: 18px;
    }
    td, th {
        flex: 1;
        text-align: start;
        padding: 5px 10px;
    }
    .btn-action {
        cursor: pointer;
    }
`