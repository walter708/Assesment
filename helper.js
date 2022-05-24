const getTags = tagsString =>{
  tags = tagsString.split()
  
  for(i = 0 ; i < tags.length; i++){
    tags[i] = tags[i].trim()
  }
  
  return tags
}

module.exports = {getTags}