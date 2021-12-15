import { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import Searching from './components/Searching'
import Trending from './components/Trending'
import QuestionList from './components/QuestionList'
import Loading from './components/Loading'

import { MAIN_URL, QUESTIONS_PATH, TAGS_PATH } from './assets/API'
import './App.scss';

function App() {
	//storages
	const [questions, setQuestions] = useState([]);
	const [tags, setTags] = useState([]);
	const [currentTag, setCurrentTag] = useState(undefined);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(null);
	//status
	const [isLoading, setLoading] = useState(false);
	const [isScrollFar, setScrollFar] = useState(false);
	//refs
	const outputLot = useRef();

	useEffect(() => {
		const detect = outputLot.current.addEventListener('scroll', detectHeight);
		return () => {
			outputLot.current.removeEventListener('scroll', detect)
		}
	}, []);

	function getQuestionsList(tags, page, callByScroll = false) {
		const url = `${MAIN_URL}${QUESTIONS_PATH}&tagged=${tags}&page=${page}`;
		Axios.get(url)
			.then(res => {
				if (res.status === 200) {
					const { items, has_more } = res.data;
					setHasMore(has_more);

					if (callByScroll) {
						setQuestions(prev => prev.concat(items));//same tags
						setCurrentPage(prev => prev + 1);//update current page
					} else {
						setQuestions(items);//refresh new tags
						setCurrentPage(1);//reset current page
					}
				}
			})
			.catch(rej => {
				alert(rej);
			})
	}

	function getTags(inname) {
		const url = `${MAIN_URL}${TAGS_PATH}${inname ? `&inname=${inname}` : ''}`;
		setLoading(true);
		Axios.get(url)
			.then(res => {
				if (res.status === 200) {
					const { items } = res.data;
					setLoading(false);
					setTags(items);
					return true;
				}
			})
			.then(res => {
				if (res) {
					setCurrentTag(inname); 
					getQuestionsList(inname, 1);
				}
			})
			.catch(rej => {
				setLoading(false);
				alert(rej);
			})
	}

	function detectHeight() {
		const { scrollTop } = outputLot.current;
		if (scrollTop > 1500) {
			setScrollFar(true);
		} else {
			setScrollFar(false);
		}
	}

	function moveToTop() {
		outputLot.current.scrollTop = 0;
	}

	return (
		<div className="App">
			<div className="container">
				<Searching
					getQuestionsList={getQuestionsList}
					getTags={getTags}
					setTags={setTags}
					tags={tags}
				/>
				<div ref={outputLot} id="outputLot" className="output-lot">
					<Trending
						getQuestionsList={getQuestionsList}
						getTags={getTags}
						tags={tags}
						currentTag={currentTag}
					/>
					<QuestionList
						currentPage={currentPage}
						currentTag={currentTag}
						getQuestionsList={getQuestionsList}
						questions={questions}
						hasMore={hasMore}
					/>
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
