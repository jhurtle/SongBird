package com.songbird.dataPush;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "name",
    "duration",
    "explicit",
    "artist",
    "lyrics",
    "trackNum"
})
public class Track {

    @JsonProperty("name")
    private String name;
    @JsonProperty("src")
    private String src;
    @JsonProperty("duration")
    private int duration;
    @JsonProperty("explicit")
    private boolean explicit;
    @JsonProperty("artist")
    private List<String> artist = null;
    @JsonProperty("lyrics")
    private String lyrics;
    @JsonProperty("trackNum")
    private int trackNum;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public Track() {
    }

    /**
     * 
     * @param trackNum
     * @param duration
     * @param explicit
     * @param name
     * @param artist
     * @param lyrics
     */
    public Track(String name, String src, int duration, boolean explicit, List<String> artist, String lyrics, int trackNum) {
        super();
        this.name = name;
        this.src=src;
        this.duration = duration;
        this.explicit = explicit;
        this.artist = artist;
        this.lyrics = lyrics;
        this.trackNum = trackNum;
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("src")
    public String getSrc() {
        return src;
    }

    @JsonProperty("src")
    public void setSrc(String src) {
        this.src = src;
    }

    @JsonProperty("duration")
    public int getDuration() {
        return duration;
    }

    @JsonProperty("duration")
    public void setDuration(int duration) {
        this.duration = duration;
    }

    @JsonProperty("explicit")
    public boolean isExplicit() {
        return explicit;
    }

    @JsonProperty("explicit")
    public void setExplicit(boolean explicit) {
        this.explicit = explicit;
    }

    @JsonProperty("artist")
    public List<String> getArtist() {
        return artist;
    }

    @JsonProperty("artist")
    public void setArtist(List<String> artist) {
        this.artist = artist;
    }

    @JsonProperty("lyrics")
    public String getLyrics() {
        return lyrics;
    }

    @JsonProperty("lyrics")
    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    @JsonProperty("trackNum")
    public int getTrackNum() {
        return trackNum;
    }

    @JsonProperty("trackNum")
    public void setTrackNum(int trackNum) {
        this.trackNum = trackNum;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}
