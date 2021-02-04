import React from 'react';
import { post } from 'axios'; //post 방식으로 고객 추가 데이터를 서버로 보낼 수 있도록 axios에서 post 라이브러리를 추가한다.

class CustomerAdd extends React.Component {
    //생성자. 초기화.
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday:'',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault() //데이터가 서버로 전달되면서 오류가 발생하지 않도록 불러오는 함수.
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh(); //서버로 데이터가 전송완료된 것을 응답받고 난 다음 리프레시를 수행하도록 이곳에 넣어준다.
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
        // window.location.reload(); //간단한 테스트를 위해서 새로고침 시행.
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0], //여기서 target은 이벤트가 발생한 input값 자체를 말한다. 여러개를 올릴 수도 있는데 여기서는 첫번째 파일 하나를 선택.
            fileName : e.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;//이벤트로 받아온 값이 있으면, name이 userName이라고치면 userName의 value를 state값으로 넣겠다는 뜻 
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    //실제로 보낼 데이터.
    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객추가</h1>
                프로필 이미지:<input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/> 
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>    
            </form>
        )
    }
}

export default CustomerAdd; //외부 라이브러리에서 사용될 수 있도록 export를 해준다.