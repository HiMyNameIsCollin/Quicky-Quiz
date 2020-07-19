import React, {useState, useEffect} from 'react'

const Game = ({questions, whosPlaying, handleGameRestart}) => {

	const useMountEffect = (fun) => useEffect(fun, [])

	const [score, setScore] = useState([])
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [currentTurn, setTurn] = useState()
	const [gameOver, setGameOver] = useState(undefined)

	const answerRefs = []

	useMountEffect(() => {
		let scores = []
		whosPlaying.map((p, i) =>{
			scores.push(p)
		})
		setScore(scores)
		setTurn(whosPlaying[0].player)
	})
	useEffect(() => {
		if(currentQuestion === questions.length){
			let winner = []
			score.forEach((s, i) => {
				if(winner[0]){
					if(s.score > winner[0].score){
						winner[0] = s
					} else if(s.score === winner[0].score){
						winner.push(s)
					}
				} else {
					winner.push(s)
				}
			})
			setGameOver(winner)
		}
	},[currentQuestion])

	const handleAnswer = (e, ref) => {
		let scores = [...score]
		e.preventDefault()
/*###########################ANIMATION####################################*/
		answerRefs.forEach((r, i) => {
			if(r === ref){
				r.style.animation = 'slit-out-vertical 0.5s ease-in both'
				setTimeout(()=>{
					r.style.animation = 'slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'
				}, 290);
			} else {
				setTimeout(()=> {
					r.style.animation = 'slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
				}, 200);
				setTimeout(()=>{
					r.style.animation = 'slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'
				}, 290);
			}
		})
/*#############################HANDLE ANSWER##########################*/
		if(questions[currentQuestion].correct_answer === e.target.innerText){
			scores.forEach((player, i) => {
				if(player.player === currentTurn) {
					player.score = player.score + 1
				}
			})
		} else {
			scores.forEach((player, i) => {
				if(player.player === currentTurn) {
					if(player.score > 0){
						player.score = player.score - 1
					} else {

					}
				}
			})
		}
		setScore(scores)
		if(currentTurn < score.length){
			setTimeout(()=>{
				setCurrentQuestion(currentQuestion => currentQuestion + 1)
				setTurn(currentTurn => currentTurn + 1)
			}, 300);
		} else {
			setTimeout(()=>{
				setCurrentQuestion(currentQuestion => currentQuestion + 1)
				setTurn(currentTurn => currentTurn = 1)
			}, 300);
		}
	}

	return (
		<div id='game'>
			{
				gameOver !== undefined ?
				<div id="gameOver">
					<div className='card gameOverCard'>
						<p> The winner is... </p> <br/>
						{
							gameOver.length === 1 ?
							<React.Fragment>
							<div>
								<p> {gameOver[0].name} </p> 
							</div>
							<p> {gameOver[0].score} </p>
							</React.Fragment> :
							gameOver.length === 2 ?
							<React.Fragment>
							<div>
								<p> {gameOver[0].name} & {gameOver[1].name} </p> 
							</div>
							<p> {gameOver[0].score} </p>
							</React.Fragment> :
							gameOver.length === 3 ?
							<React.Fragment>
							<div>
								<p> {gameOver[0].name} & {gameOver[1].name} & {gameOver[2].name} </p> 
							</div>
							<p> {gameOver[0].score} </p>
							</React.Fragment>  :
							gameOver.length === 4 ?
							<React.Fragment>
							<div>
								<p> {gameOver[0].name}p & {gameOver[1].name} & {gameOver[2].name} & {gameOver[3].name} </p> 
							</div>
							<p> {gameOver[0].score} </p>
							</React.Fragment>  :
							null
						}
					</div>
				</div>:
				null
			}
			<div id="scoreBoard">
			{
				score.map((s, i) => {
				return(
				<div className="playerCard" style={i === 0 ? {background: '#0D3B66'} : i === 1 ? {background: '#9a031e'} : i === 2 ? {background: '#5f0f40'} : i === 3 ? {background:'#e36414'} : null}>
					<p>{s.name}</p> <p style={{gridColumn: '3/4'}}> {s.score} </p>
				</div>
					)
				})
			}
			</div>
			{
			questions.map((q, i) =>{
				if(i === currentQuestion && currentQuestion < questions.length){
					return(
					<div id="title" className="cardContainer questionCard" >
						<div className='card'>
							<p style={{padding: '0px 24px'}}> {q.question}</p>
						</div>
					</div>
						)
					}
				})
			}
			<div id="answerContainer">
				{
					currentQuestion < questions.length ?
					questions[currentQuestion].incorrect_answers.map((ia, i) =>{
						return <div ref={ia => answerRefs[i] = ia} onClick={(e) => handleAnswer(e, answerRefs[i])} className='answerCard'><div><span>{ia}</span></div></div>
					}) :
					<div onClick={handleGameRestart} id='gameRestart'> <div>< span> Play again? </span></div> </div>
				}
			</div>
		</div>
	)
}

export default Game