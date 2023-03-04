import styles from '@/styles/Home.module.css'
export default function Home() {
  return (
    <>
      <div className = {styles.wrapper}>
        <div className = {styles.pantry}></div>
        <div className = {styles.personal_info}></div>
        <div className = {styles.meal_section}></div>
        <div className = {styles.summary}></div>
      </div>
    </>
  )
}