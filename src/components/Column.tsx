import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { ColumnsType, TaskType } from '../App'
import Task from './Task'

interface Props {
    column: ColumnsType
    tasks: TaskType[]
}

const Column = ({ column, tasks }: Props) => {
    return (
        <Container>
            <Title>{column.title}</Title>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) =>
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task, index) => {
                            return <Task key={task.id} task={task} index={index} />
                        })}
                        {provided.placeholder}
                    </TaskList>
                }
            </Droppable>
        </Container>
    )
}

export default Column

interface TaskListProps {
    isDraggingOver: boolean
}

const Container = styled.div`
/* margin: 8px; */
/* border: 1px solid gray; */
/* border-radius: 2px; */
border: 1px solid #3a3737;
border-radius: 6px;
background-color: #242424;
display: flex;
flex-direction: column;
/* min-height: 200px; */
min-height: 295px;
`

const Title = styled.h3`
padding: 8px;
color: #e52f4f;
`

const TaskList = styled.div<TaskListProps>`
padding: 8px;
transition: background-color 350ms ease;
background-color: ${props => (props.isDraggingOver ? '#1b1b1b' : '#242424')};
flex-grow: 1;
`