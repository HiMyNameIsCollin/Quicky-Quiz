import React, {useState, useEffect} from 'react'
import Menu from './components/Menu'
import Game from './components/Game'
import decode from 'ent/decode'

const GameContainer = () => {
	const [route, setRoute] = useState('menu')
	const [menu, showMenu] = useState(false)
	const [whosPlaying, setPlayers] = useState([])
	const [userInput, setInput] = useState('')
	const [questions, prepareQuestions] = useState([])
	const [error, setError] = useState(undefined)
	const players = ['1','2','3','4']

	const playerBtnRefs = []
	const nameFormRefs = []

	useEffect(()=>{
		let namesSet = 0
		whosPlaying.forEach((player, i) =>{
			if(player.name !== undefined){
				namesSet++
				console.log(player)
			}
		})
		if(namesSet === whosPlaying.length && whosPlaying.length !== 0){
			document.getElementById('titleContainer').style.animation = 'slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
			setTimeout(() => {
				showMenu(true)
			}, 500);
		}
	}, [whosPlaying])

	useEffect(() => {
		if(questions.length > 0){
			questions.map((answer, i ) => {
				answer.incorrect_answers.push(answer.correct_answer)
				shuffleArray(answer.incorrect_answers)
			})	
			function shuffleArray(array) {
		    for (let i = array.length - 1; i > 0; i--) {
		        const j = Math.floor(Math.random() * (i + 1));
		        [array[i], array[j]] = [array[j], array[i]];
		    }
		   }
		   	document.getElementById('menuContainer').style.animation = 'slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
		   	setTimeout(()=> {
				setRoute('game')
		   	}, 500);
		}
	}, [questions])

	const handleGameStart = (cat, diff, quest) => {
		fetch(`https://opentdb.com/api.php?amount=${quest}&category=${cat.id}&difficulty=${diff}`)
		.then(response => response.json())
		.then(response => {
			if(response.response_code === 0){
				response.results.map((r, i) =>{
					if(r.question.length > 100) {
						response.results.splice(i, 1)
					}
					decode(r.question)
					decode(r.correct_answer)
					r.incorrect_answers.map((ia, i) =>{
						decode(ia)
					})
				})
				prepareQuestions(questions.concat(...response.results))
			} else if (response.response_code === 1){
				setError("Query was not found in Database")
			} else {
				setError("Network error")
			}
		})
		.catch(err => setError('Network'))
	}

	const handleGameRestart = () => {
		setRoute('menu')
		prepareQuestions([])
		setPlayers([])
		showMenu(false)
	}

	const handlePlayers = (e, player) => {
		e.preventDefault()
		if(whosPlaying.length === 0){
			for (let i = 0 ; i < player; i++){
			let user = {
				name: undefined,
				player: i + 1,
				score: 0
			}
			setPlayers(whosPlaying => whosPlaying.concat(user))
		}
		} else {
			setPlayers([])
			for (let i = 0 ; i < player; i++){
			let user = {
				name: undefined,
				player: i + 1,
				score: 0
			}
			setPlayers(whosPlaying => whosPlaying.concat(user))
		}
		}
	}
	const handleNames = (e, ref, player) => {
		e.preventDefault()
		if(userInput !== ''){
			let playerArray = [...whosPlaying]
			playerArray.forEach((user, i) => {
				if(user.player === player.player){
					user.name = userInput
				}
			})
			setPlayers(playerArray)
			handleNameAnimation(ref)
		} else {
			setError('Name is required')
		}
	}

	const handleNameAnimation = ref => {
		nameFormRefs.forEach((r, i) => {
			if(r === ref){
				r.style.animation = 'slit-out-vertical 0.5s ease-in both'
			}
		})
	}

	const handlePlayerAnimation = (ref) =>{
		playerBtnRefs.forEach((r, i)=>{
			if(r === ref){
				r.style.animation = 'slit-out-vertical 0.5s ease-in both'
			} else {
				r.style.animation = 'slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
			}
		})
	}

	return (
		<div id='gameContainer'>
		{
			error !== undefined ?
			<div onClick={()=>setError(undefined)} id="errorWindow">
				<div>
					<div id='errorMessage'>
						<span> {error} </span>
					</div>
				</div>
			</div> :
			null
		}
		{
			route === 'menu' ?
			<React.Fragment>
			<div id="titleContainer">
				<div id="title" className="cardContainer">
					<div className='card'>
						<p> Quicky Quiz </p>
					</div>
			</div>
			</div>
				<div id="playerBtnContainer">
				{
					players.map((player, i)=> {
						if(i === 0){
							return (				
							<div ref={player => playerBtnRefs[i] = player} onClick={(e) => {
								handlePlayerAnimation(playerBtnRefs[i])
								handlePlayers(e, player)}
							} 
							className="myBtn playerBtn">
								<p> {player} player </p>
							</div>
							)		
						} else{
							return (				
							<div ref={player => playerBtnRefs[i] = player} onClick={(e) => {
								handlePlayerAnimation(playerBtnRefs[i])
								handlePlayers(e, player)}
							}className="myBtn playerBtn">
								<p> {player} players </p>
							</div>
							)
						}
					})
				}
				</div> 
				{
					whosPlaying.length > 0 ?
					<div id='nameEntryContainer'>
					{
						whosPlaying.map((player, i) => {
						return(
							<div ref={player => nameFormRefs[i] = player} className="cardContainer nameInput">
								<div className='card '>
									<form onSubmit={(e)=> handleNames(e, nameFormRefs[i], player)}
									className='nameForm'>
										<label htmlFor="nameInput"> Player {player.player}</label>
											<input onChange={(e) => setInput(e.target.value)} type='text' name='nameInput' />
										<div onClick={(e)=> handleNames(e, nameFormRefs[i], player)}
									className='inputButton'> </div>
									</form>
								</div>
							</div>
							)
						})
					}
					</div>:
					null
				}
				{
					menu === true ?
					<Menu handleGameStart={handleGameStart} whosPlaying={whosPlaying}/> :
					null
				}
				</React.Fragment> :
				<Game questions={questions} whosPlaying={whosPlaying} handleGameRestart={handleGameRestart}/>
		}

		</div>
	)
}

export default GameContainer