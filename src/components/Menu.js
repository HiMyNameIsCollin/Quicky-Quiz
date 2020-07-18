import React, {useState, useEffect} from 'react'
import {settings} from '../settings.js'

const Menu = ({whosPlaying, handleGameStart}) => {
	const [route, setRoute] = useState('')
	const [menuConfirm, showMenuConfirm] = useState(false)
	const [cat, setCat] = useState(undefined)
	const [diff, setDiff] = useState(undefined)
	const [quest, setQuest] = useState(undefined)


	const menuBtnRefs = []

	useEffect(() => {
		if(cat !== undefined && diff !== undefined && quest !== undefined){
			setTimeout(()=> {
				showMenuConfirm(true)
			}, 500);
		}
	}, [cat, diff, quest])

	useEffect(() => {
	

	},[])

	const handleSettingConfirm = (ref, choice) => {
		if(route === 'category'){
			if(cat === undefined){
				setCat(choice)
			}
		}else if (route === 'difficulty'){
			if(diff === undefined){
				setDiff(choice)
			}
		}else if(route === 'questions'){
			if(quest === undefined){
				setQuest(choice)
			}
		}
	}

	const handleBtnAnimation = (ref) => {
		menuBtnRefs.forEach((r, i) =>{
			if(r === ref) {
				r.style.animation = 'slit-out-vertical 0.5s ease-in both'
			} else {
				setTimeout(()=> {
					r.style.animation = 'slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
				}, 250);
			}
			setTimeout(()=> {
				setRoute('')
			}, 300);
		})
	}

	return (
		<div id='menuContainer'>
			{
				menuConfirm === true ?
				<div id="menuConfirm">
					<div id="goBack" onClick={() =>{
						setCat(undefined)
						setDiff(undefined)
						setQuest(undefined)
						showMenuConfirm(false)
					}}><p>Go <br/> Back </p></div>
					<div id="confirmPlayers">
						<p> Players </p>
						{
						whosPlaying.map((player, i)=> {
							if(player.player === 1){
							return <div className="confirmCard" style={{background: '#0D3B66'}}><div><span>{player.name}</span></div></div>
							} else if (player.player === 2) {
								return <div className="confirmCard" style={{background: '#9a031e'}}><div><span>{player.name}</span></div></div>
							} else if (player.player === 3){
								return <div className="confirmCard" style={{background: '#5f0f40'}}><div><span>{player.name}</span></div></div>
							} else if(player.player === 4) {
								return <div className="confirmCard" style={{background: '#e36414 '}}><div><span>{player.name}</span></div></div>
							}
						})
					}
					</div>
					<div id="confirmOptions">
						<p> Options </p>
						<div className="confirmCard" style={{background: '#0D3B66'}}><div><span>{cat.name}</span></div></div>
						<div className="confirmCard" style={{background: '#9a031e'}}><div><span>{diff.charAt(0).toUpperCase() + diff.slice(1)}</span></div></div>
						<div className="confirmCard" style={{background: '#5f0f40'}}><div><span>{quest} questions</span></div></div>
					</div>
					<div onClick={() => handleGameStart(cat, diff, quest)} id='confirmConfirm'> <span> All good? </span> </div>
				</div> :
				null
			}


				<div className='menuCard' style={{background: '#0D3B66'}}>
					<div onClick={()=> {
						if(menuBtnRefs.length !== 0) {
							menuBtnRefs.forEach((b, i) => {
								b.style.animation = 'slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
							})
							setTimeout(()=>{
								menuBtnRefs.forEach((b, i ) =>{
									b.style.animation = 'slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'
								})
								setRoute('categories')
							}, 250);
						} else {
							setRoute('categories')
						}
						if(diff !== undefined){
							setCat(undefined)
						}
						if(route === 'categories'){
							menuBtnRefs.forEach((b, i) => {
								b.style.animation = 'slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
							})
							setTimeout(()=>{
								menuBtnRefs.forEach((b, i ) =>{
									b.style.animation = 'slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'
								})
								setRoute('')
							}, 250);
						}
					}} className="menu card"><p>Categories </p></div>
				</div> 


				<div className='menuCard' style={{background: '#9a031e'}}>
					<div onClick={()=> {
						if(menuBtnRefs.length !== 0) {
							menuBtnRefs.forEach((b, i) => {
								b.style.animation = 'slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
							})
							setTimeout(()=>{
								menuBtnRefs.forEach((b, i ) =>{
									b.style.animation = 'slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'
								})
								setRoute('difficulty')
							}, 250);
						} else {
							setRoute('difficulty')
						}
						if(diff !== undefined){
							setDiff(undefined)
						}
						if(route === 'difficulty'){
							menuBtnRefs.forEach((b, i) => {
								b.style.animation = 'slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
							})
							setTimeout(()=>{
								menuBtnRefs.forEach((b, i ) =>{
									b.style.animation = 'slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'
								})
								setRoute('')
							}, 250);
						}
					}} className="menu card"><p>Difficulty</p></div>
				</div> 			


				<div className='menuCard' style={{background: '#5f0f40'}}>
					<div onClick={()=> {
						if(menuBtnRefs.length !== 0) {
							menuBtnRefs.forEach((b, i) => {
								b.style.animation = 'slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
							})
							setTimeout(()=>{
								menuBtnRefs.forEach((b, i ) =>{
									b.style.animation = 'slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'
								})
								setRoute('questions')
							}, 250);
						} else {
							setRoute('questions')
						}
						if(diff !== undefined){
							setQuest(undefined)
						}
						if(route === 'questions'){
							menuBtnRefs.forEach((b, i) => {
								b.style.animation = 'slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
							})
							setTimeout(()=>{
								menuBtnRefs.forEach((b, i ) =>{
									b.style.animation = 'slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'
								})
								setRoute('')
							}, 250);
						}
					}} className="menu card"><p> # </p></div>
				</div>	
	
				{
					route === 'categories'?
					<div id="menuBtnContainer">
					{	
						settings[0].map((c, i) => {
							return <div ref={c => menuBtnRefs[i] = c} className="menuBtn" onClick={() => {
								handleBtnAnimation(menuBtnRefs[i])
								setCat(c)
							}}> <div><span>{c.name}</span></div></div>
						}) 
					}
					</div> :
					route === 'difficulty' ?
					<div id="menuBtnContainer" style={{flexDirection: 'column'}}>
					{
					settings[1].map((d, i) => {
							return <div ref={d => menuBtnRefs[i] = d} className="menuBtn" onClick={() => {
								setDiff(d.toLowerCase())
								handleBtnAnimation(menuBtnRefs[i])
							}} 
							style={{background: '#9a031e'}}><div><span>{d}</span></div></div>
						}) 
					}
					</div> :
					route === 'questions' ?
					<div id="menuBtnContainer" style={{flexDirection: 'column'}}>
					{
						whosPlaying.length === 1 || whosPlaying.length === 2 ?
						settings[2].map((q, i) => {
							return <div ref={q => menuBtnRefs[i] = q} className="menuBtn" onClick={() => {
								setQuest(q)
								handleBtnAnimation(menuBtnRefs[i])
							}} style={{background: '#5f0f40'}}><div><span>{q}</span></div> </div>
						}) :
						whosPlaying.length === 3 ?
						settings[3].map((q, i) => {
							return <div ref={q => menuBtnRefs[i] = q} className="menuBtn" onClick={() => {
								setQuest(q)
								handleBtnAnimation(menuBtnRefs[i])
							}} style={{background: '#5f0f40'}}><div><span>{q}</span></div> </div>
						}) :
						settings[4].map((q, i) => {
							return <div ref={q => menuBtnRefs[i] = q} className="menuBtn" onClick={() => {
								setQuest(q)
								handleBtnAnimation(menuBtnRefs[i])
							}} style={{background: '#5f0f40'}}><div><span>{q}</span></div> </div>
						}) 
					}
					</div> :
					null
				}

		</div>
	)
}

export default Menu