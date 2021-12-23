import { useState, useEffect, useRef } from 'react'
import Searching from './components/Searching'
import Trending from './components/Trending'
import QuestionList from './components/QuestionList'
import Loading from './components/Loading'

import { useSelector } from 'react-redux'

import './App.scss';

function App() {
	//redux
	const isLoading = useSelector(state => state.isLoading)
	//state
	const [isScrollFar, setScrollFar] = useState(false);
	//refs
	const outputLot = useRef();

	useEffect(() => {
		const detect = outputLot.current.addEventListener('scroll', detectHeight);
		return () => {
			outputLot.current.removeEventListener('scroll', detect)
		}
	}, []);

	const detectHeight = () => {
		const { scrollTop } = outputLot.current;
		if (scrollTop > 1500) {
			setScrollFar(true);
		} else {
			setScrollFar(false);
		}
	}

	const moveToTop = () => {
		outputLot.current.scrollTop = 0;
	}

	return (
		<div className="App">
			<div className="container">
				<Searching/>
				<div ref={outputLot} id="outputLot" className="output-lot">
					<Trending />
					<QuestionList />
				</div>
			</div>
			{
				isLoading ?
					<Loading /> :
					''
			}
			{
				isScrollFar ?
					<button onClick={moveToTop} className="express btn">
						<i className="bi bi-arrow-up-circle bg-light fs-1"></i>
					</button> :
					''
			}
		</div>
	);
}
export default App;
