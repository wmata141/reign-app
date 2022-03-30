import moment from 'moment'
import Timer from '../assets/images/timer.svg'
import CorazonVacio from '../assets/images/corazonVacio.svg'
import CorazonLleno from '../assets/images/corazonLleno.svg'

const clickOpen = (url) => {
  window.open(url);
}

const ContentList = ({ currentPosts, handleFaves }) => {
    const now = moment();
    
    return (
        <div className="Reactangle-Card-Content">
                {
                  currentPosts.map((post, i) => {
                    const duration = moment.duration(now.diff(post.created_at));
                    let agoByAuthor = `${duration._data.hours} hours ago by ${post.author}`

                    if (duration._data.hours < 1) {
                      agoByAuthor = `${duration._data.minutes} minutes ago by  ${post.author}`
                    }

                    return (
                      <div className="Rectangle-Card" key={i}>
                        <div style={{ display: 'grid' }} onClick={() => clickOpen(post.story_url)}>
                          <span className="-hours-ago-by-autho">
                            <img src={Timer} alt="timer" className="iconmonstr-time-2" />
                            {agoByAuthor}
                          </span>

                          <span className="Yes-React-is-taking">
                            {post.story_title}
                          </span>
                        </div>

                        <div className="Rectangle-Right" onClick={() => handleFaves(post)}>
                          {
                            post.faves ? (
                              <img src={CorazonLleno} alt="heart" className="iconmonstr-favorite-3" />
                            ) : (
                              <img src={CorazonVacio} alt="heart" className="iconmonstr-favorite-3" />
                            )
                          }

                        </div>
                      </div>
                    )
                  })}
              </div>
    )
}

export default ContentList