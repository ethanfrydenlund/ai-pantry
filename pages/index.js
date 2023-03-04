import styles from '@/styles/Home.module.css'
export default function Home() {
  return (
    <>
      <div id = {styles.wrapper}>
        <div id = {styles.pantry}></div>
        <div id = {styles.personal_info}></div>
        <div id = {styles.meal_section}></div>
        <div id = {styles.summary}></div>
      </div>
    </>
  )
}