import React, { memo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { TaskType } from '../App'
import HandleSvg from '../assets/HandleSvg'

interface Props {
    task: TaskType
    index: number
}

const Task = ({ task, index }: Props) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) =>
                <Container
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {task.content}
                    <Handle {...provided.dragHandleProps} >
                        <HandleSvg />
                    </Handle>
                </Container>
            }
        </Draggable>
    )
}

export default Task

interface ContainerProps {
    isDragging: boolean
}

const Container = styled.div<ContainerProps>`
    border: 1px solid gray;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    transition: background-color 150ms ease;
    /* background-color: #242424; */
    background-color: ${props => (props.isDragging ? '#424242' : '#242424')};
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Handle = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 2px;
    /* background-color: orange; */
`