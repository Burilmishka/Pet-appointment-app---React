import React from 'react';
import Note from './note';

export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fullArr: [],
            petName: '',
            petOwner: '',
            petNote: '',
            sortOpt: 'nosort'
        }

        this.pushNote = this.pushNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.setSort = this.setSort.bind(this);
    }

    getInputText(key){
       return e => {
           this.setState({[key]: e.target.value});
        }
    }


    pushNote(){
        let nObj = {
            petName: this.state.petName,
            petOwner: this.state.petOwner,
            petNote: this.state.petNote
        }
        let fullArr = [...this.state.fullArr];
        fullArr.push(nObj);
        console.log(fullArr);

        this.setState({
            fullArr: fullArr,
            petName: '',
            petOwner: '',
            petNote: '', 
            filterField: ''   
        })
    }

    deleteNote(inc){
        let delArr = [...this.state.fullArr];
        delArr.splice(inc, 3);
        this.setState({fullArr: delArr});
    } 
    
    setSort(e){
        let sortOpt = e.target.value;
        // console.log(sortOpt);
        this.setState({sortOpt}, () => 
            console.log(this.state.sortOpt));
    }

    // setSort({target:{value:sortOpt}}){
	// 	this.setState({sortOpt}, () => {
	// 		console.log(this.state);
	// 	}); // {sortOrder: sortOrder}
	// }




    render(){
        let notesArr = [...this.state.fullArr];

        notesArr = notesArr.filter( item => {
            return item.petName.indexOf(this.state.filterField) == 0;
        })



        switch (this.state.sortOpt) {
            case 'up': 
                notesArr.sort( (a,b) => {
                    if(a.petName > b.petName){
                        return 1;
                    }else return -1;
                });
                console.log(notesArr);
            break;

            case 'down':
                notesArr.sort( (a,b) => {
                    if(a.petName < b.petName){
                        return 1;
                    }else return -1;
                });
                console.log(notesArr);
            break;
        }


        let notes = notesArr.map( (item, index) =>{
            return (<Note
                index={index}
                key={index}
                petName={item.petName}
                petOwner={item.petOwner}
                petNote={item.petNote}
                deleteNote={this.deleteNote}
            />)
        } )




        
        return(
            <div>

            <div>
                <span>Pet Name</span>
                <input
                    onChange = {this.getInputText('petName')}
                    className = 'petName'
                    type = 'text'
                />
            </div>

            <div>
                <span>Pet Owner</span>
                <input
                onChange = {this.getInputText('petOwner')}
                    className = 'petOwner'
                    type = 'text'
                />
            </div>
            
            <div>
                <span>Pet Notes</span>
                <input
                    onChange = {this.getInputText('petNote')}
                    className = 'petNotes'
                    type = 'text'
                />
            </div>
            
            <div>
                <button
                    onClick = {this.pushNote}
                >Ok</button>
            </div>
            
            <div>
                <select
                onChange = {this.setSort}
                >
                    <option value='nosort'>No sort</option>
                    <option value='up'>up->down</option>
                    <option value='down'>down->up</option>
                </select>
            </div>
            
            <div>
                <span>Filter</span>
                <input
                    onChange = {this.getInputText('filterField')}
                    type = 'text'
                />
            </div>

            <div>
                {notes}
            </div>
            </div>   
        )   
    }
};