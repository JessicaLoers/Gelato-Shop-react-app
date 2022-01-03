import styled from 'styled-components'
import { useState } from 'react'

function Tags({ label, tags, onUpdateTags, onDeleteTag }) {
  const [tagInput, setTagInput] = useState('')

  const handleChange = (event) => {
    const tagInputValue = event.target.value
    setTagInput(tagInputValue)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onUpdateTags(tagInput.toUpperCase())
      setTagInput('')
    }

    if (event.key === 'Backspace' && tagInput === '' && tags.length > 0) {
      onDeleteTag(tags[tags.length - 1])
    }
  }

  return (
    <TagsContainer>
      <label htmlFor='tags'>{label} feed me with specials</label>
      <TagsWrapper>
        {tags.map((tag, index) => (
          <Tag key={index} onClick={() => onDeleteTag(tag)}>
            {tag}
          </Tag>
        ))}
        <input
          type='text'
          id='tags'
          name='tags'
          placeholder='Add a Tag'
          value={tagInput}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </TagsWrapper>
    </TagsContainer>
  )
}

export default Tags

const TagsContainer = styled.section`
  border: 1px solid #333;
  display: grid;
  margin: 2rem auto;
  label {
    font-weight: bold;
  }
  input {
    border: none;
    border-left: 1px solid #999;
    margin-left: 0.5rem;
    outline: none;
    padding: 0.5rem 0.2rem;
    margin: 1rem;
  }
`

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.4rem;
`

const Tag = styled.span`
  background: #bb2528;
  border-radius: 0.3rem;
  color: #f8b229;
  margin: 0.2rem;
`
