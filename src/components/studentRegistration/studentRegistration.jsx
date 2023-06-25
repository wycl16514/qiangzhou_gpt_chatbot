import { Form } from 'semantic-ui-react'

const options = [
    { key: 'm', text: '男', value: 'male' },
    { key: 'f', text: '女', value: 'female' },
]

function StudentRegistration() {

    return (
        <Form>
            <Form.Group widths='equal'>
                <Form.Input fluid label='姓名' placeholder='请输入姓名'></Form.Input>
                <Form.Input fluid label="身份证号" placeholder="请输入身份证号"></Form.Input>
                <Form.Select fluid label="性别" options={options} placeholder="请选择性别"></Form.Select>
            </Form.Group>
        </Form>
    )

}

export default StudentRegistration;