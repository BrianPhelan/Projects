import controlP5.*;  //<>//
import ddf.minim.*;
import ddf.minim.ugens.*;
import ddf.minim.effects.*;

Minim minim;
AudioOutput out;
Oscil tri, sin, saw, tri2, sin2, saw2, tri3, sin3, saw3, mod;
ControlP5 controlP5;
Frequency PF1, PF2, PF3;
Boolean sinOn, sawOn, triOn, sin2On, saw2On, tri2On, sin3On, saw3On, tri3On;
Midi2Hz midi;

void setup() {
  size(400, 625, P2D);
  smooth();

  controlP5 = new ControlP5(this);

  minim = new Minim(this);
  
  out = minim.getLineOut();

  PF1=Frequency.ofPitch("A4");
  PF2=Frequency.ofPitch("A4");
  PF3=Frequency.ofPitch("A4");

  tri = new Oscil( PF3, 0.5f, Waves.TRIANGLE);
  sin = new Oscil( PF1, 0.5f, Waves.SINE);
  saw = new Oscil( PF2, 0.5f, Waves.SAW);
  
  tri2 = new Oscil( PF3, 0.5f, Waves.TRIANGLE);
  sin2 = new Oscil( PF1, 0.5f, Waves.SINE);
  saw2 = new Oscil( PF2, 0.5f, Waves.SAW);
  
  tri3 = new Oscil( PF3, 0.5f, Waves.TRIANGLE);
  sin3 = new Oscil( PF1, 0.5f, Waves.SINE);
  saw3 = new Oscil( PF2, 0.5f, Waves.SAW);
  
  mod = new Oscil( 2, 0.8f, Waves.SINE);
  
  midi = new Midi2Hz( 50 );
  
  midi.patch( sin.frequency );
  midi.patch( saw.frequency );
  midi.patch( tri.frequency );
  
  midi.patch( sin2.frequency );
  midi.patch( saw2.frequency );
  midi.patch( tri2.frequency );
  
  midi.patch( sin3.frequency );
  midi.patch( saw3.frequency );
  midi.patch( tri3.frequency );

//Code outline taken from ControlP5 library and modified completely
  controlP5.setColorForeground(0xffaa0000);
  controlP5.setColorBackground(0xff660000);
  controlP5.setColorActive(0xffff0000);

  controlP5.addToggle("Sine")
    .setValue(false)
    .setPosition(10, 10)
    .setSize(20, 20);

  controlP5.addToggle("Saw")
    .setValue(false)
    .setPosition(10, 50)
    .setSize(20, 20);

  controlP5.addToggle("Triangle")
    .setValue(false)
    .setPosition(10, 90)
    .setSize(20, 20); 
    
      controlP5.addToggle("Sine2")
    .setValue(false)
    .setPosition(10, 160)
    .setSize(20, 20)
    .setColorActive(0xff0000ff);

  controlP5.addToggle("Saw2")
    .setValue(false)
    .setPosition(10, 200)
    .setSize(20, 20)
    .setColorActive(0xff0000ff);

  controlP5.addToggle("Triangle2")
    .setValue(false)
    .setPosition(10, 240)
    .setSize(20, 20)
    .setColorActive(0xff0000ff);
    
  controlP5.addToggle("Sine3")
    .setValue(false)
    .setPosition(10, 310)
    .setSize(20, 20)
    .setColorActive(0xff00ff00);

  controlP5.addToggle("Saw3")
    .setValue(false)
    .setPosition(10, 350)
    .setSize(20, 20)
    .setColorActive(0xff00ff00);

  controlP5.addToggle("Triangle3")
    .setValue(false)
    .setPosition(10, 390)
    .setSize(20, 20)
    .setColorActive(0xff00ff00);

  controlP5.addSlider("SINEModulation")
    .setCaptionLabel("Sine \n Modulation")
    .setRange(0, 10)
    .setValue(0)
    .setPosition(120, 10)
    .setSize(10, 100)
    .setNumberOfTickMarks(20)
    .setColorValue(0xffff88ff)
    .setColorLabel(0xffdddddd);

   controlP5.addToggle("SINELFO")
    .setCaptionLabel("Sine \n LFO")
    .setValue(false)
    .setPosition(80, 10)
    .setSize(20, 20);
       
       
   controlP5.addSlider("SINE2Modulation")
    .setCaptionLabel("Sine2 \n Modulation")
    .setRange(0, 10)
    .setValue(0)
    .setPosition(120, 160)
    .setSize(10, 100)
    .setNumberOfTickMarks(20)
    .setColorActive(0xff0000ff)
    .setColorValue(0xffff88ff);

   controlP5.addToggle("SINE2LFO")
    .setCaptionLabel("Sine2 \n LFO")
    .setValue(false)
    .setPosition(80, 160)
    .setSize(20, 20)
    .setColorActive(0xff0000ff);
     
    controlP5.addSlider("SAWModulation")
    .setCaptionLabel("Saw \n Modulation")
    .setRange(0, 10)
    .setValue(0)
    .setPosition(220, 10)
    .setSize(10, 100)
    .setNumberOfTickMarks(20)
    .setColorValue(0xffff88ff)
    .setColorLabel(0xffdddddd)
    .setColorActive(0xff0000ff);

  controlP5.addToggle("SAWLFO")
    .setCaptionLabel("Saw \n LFO")
    .setValue(false)
    .setPosition(180, 10)
    .setSize(20, 20); 
    
  controlP5.addSlider("SAW2Modulation")
    .setCaptionLabel("Saw2 \n Modulation")
    .setRange(0, 10)
    .setValue(0)
    .setPosition(220, 160)
    .setSize(10, 100)
    .setNumberOfTickMarks(20)
    .setColorValue(0xffff88ff)
    .setColorLabel(0xffdddddd)
    .setColorActive(0xff0000ff);

  controlP5.addToggle("SAW2LFO")
    .setCaptionLabel("Saw2 \n LFO")
    .setValue(false)
    .setPosition(180, 160)
    .setSize(20, 20)
    .setColorActive(0xff0000ff);
    
    controlP5.addSlider("TRIModulation")
    .setCaptionLabel("Triangle \n Modulation")
    .setRange(0, 10)
    .setValue(0)
    .setPosition(320, 10)
    .setSize(10, 100)
    .setNumberOfTickMarks(20)
    .setColorValue(0xffff88ff)
    .setColorLabel(0xffdddddd);

  controlP5.addToggle("TRILFO")
    .setCaptionLabel("Tri \n LFO")
    .setValue(false)
    .setPosition(280, 10)
    .setSize(20, 20); 
    
  controlP5.addSlider("TRI2Modulation")
    .setCaptionLabel("Triangle2 \n Modulation")
    .setRange(0, 10)
    .setValue(0)
    .setPosition(320, 160)
    .setSize(10, 100)
    .setNumberOfTickMarks(20)
    .setColorValue(0xffff88ff)
    .setColorLabel(0xffdddddd)
    .setColorActive(0xff0000ff);

  controlP5.addToggle("TRI2LFO")
    .setCaptionLabel("Tri2 \n LFO")
    .setValue(false)
    .setPosition(280, 160)
    .setSize(20, 20)
    .setColorActive(0xff0000ff);

   controlP5.addSlider("SINE3Modulation")
    .setCaptionLabel("Sine3 \n Modulation")
    .setRange(0, 10)
    .setValue(0)
    .setPosition(120, 310)
    .setSize(10, 100)
    .setNumberOfTickMarks(20)
    .setColorActive(0xff00ff00)
    .setColorValue(0xffff88ff);

   controlP5.addToggle("SINE3LFO")
    .setCaptionLabel("Sine3 \n LFO")
    .setValue(false)
    .setPosition(80, 310)
    .setSize(20, 20)
    .setColorActive(0xff00ff00);
    
   controlP5.addSlider("SAW3Modulation")
    .setCaptionLabel("Saw3 \n Modulation")
    .setRange(0, 10)
    .setValue(0)
    .setPosition(220, 310)
    .setSize(10, 100)
    .setNumberOfTickMarks(20)
    .setColorValue(0xffff88ff)
    .setColorLabel(0xffdddddd)
    .setColorActive(0xff00ff00);

  controlP5.addToggle("SAW3LFO")
    .setCaptionLabel("Saw3 \n LFO")
    .setValue(false)
    .setPosition(180, 310)
    .setSize(20, 20)
    .setColorActive(0xff00ff00);
    
  controlP5.addSlider("TRI3Modulation")
    .setCaptionLabel("Triangle3 \n Modulation")
    .setRange(0, 10)
    .setValue(0)
    .setPosition(320, 310)
    .setSize(10, 100)
    .setNumberOfTickMarks(20)
    .setColorValue(0xffff88ff)
    .setColorLabel(0xffdddddd)
    .setColorActive(0xff00ff00);

  controlP5.addToggle("TRI3LFO")
    .setCaptionLabel("Tri3 \n LFO")
    .setValue(false)
    .setPosition(280, 310)
    .setSize(20, 20)
    .setColorActive(0xff00ff00);
}

void draw() { 
  background(0);  
  fill(255,255,255);
  stroke( 255 );
  // draw the waveforms
  for( int i = 0; i < out.bufferSize() - 1; i++ )
  {
    // find the x position of each buffer value
    float x1  =  map( i, 0, out.bufferSize(), 0, width );
    float x2  =  map( i+1, 0, out.bufferSize(), 0, width );
    // draw a line from one buffer position to the next
    line( x1, 475 + out.left.get(i)*50, x2, 475 + out.left.get(i+1)*50);
    line( x1, 575 + out.right.get(i)*50, x2, 575 + out.right.get(i+1)*50);
  }  
}

void Sine(boolean theFlag) {
  if (theFlag==false) {
    sin.unpatch(out);
    sinOn = true;
  } else {
    sin.patch(out);
    sinOn = false;
  }
}

void Saw(boolean theFlag) {
  if (theFlag==false) {
    saw.unpatch(out);
    sawOn = true;
  } else {
    saw.patch(out);
    sawOn = false;
  }
}

void Triangle(boolean theFlag) {
  if (theFlag==false) {
    tri.unpatch(out);
    triOn = true;
  } else {
    tri.patch(out);
    triOn = false;
  }
}

void Sine2(boolean theFlag) {
  if (theFlag==false) {
    sin2.unpatch(out);
    sin2On = true;
  } else {
    sin2.patch(out);
    sin2On = false;
  }
}

void Saw2(boolean theFlag) {
  if (theFlag==false) {
    saw2.unpatch(out);
    saw2On = true;
  } else {
    saw2.patch(out);
    saw2On = false;
  }
}

void Triangle2(boolean theFlag) {
  if (theFlag==false) {
    tri2.unpatch(out);
    tri2On = true;
  } else {
    tri2.patch(out);
    tri2On = false;
  }
}

void Sine3(boolean theFlag) {
  if (theFlag==false) {
    sin3.unpatch(out);
    sin3On = true;
  } else {
    sin3.patch(out);
    sin3On = false;
  }
}

void Saw3(boolean theFlag) {
  if (theFlag==false) {
    saw3.unpatch(out);
    saw3On = true;
  } else {
    saw3.patch(out);
    saw3On = false;
  }
}

void Triangle3(boolean theFlag) {
  if (theFlag==false) {
    tri3.unpatch(out);
    tri3On = true;
  } else {
    tri3.patch(out);
    tri3On = false;
  }
}

void SINEModulation(float freq) {
  mod.setFrequency(freq);
}

void SINELFO(boolean flag) {
  if (flag==true) {
    mod.patch(sin.amplitude);  //turn on amplitude modulation
    
  } else {     
    mod.unpatch(sin); //turn off amplitude modulation
  }   //<>//
}

void SAWModulation(float freq) {
  mod.setFrequency(freq);
}

void SAWLFO(boolean flag) {
  if (flag==true) {
    mod.patch(saw.amplitude);  //turn on amplitude modulation
    
  } else {                   
    mod.unpatch(saw);  //turn off amplitude modulation
  }  
}

void TRIModulation(float freq) {
  mod.setFrequency(freq);
}

void TRILFO(boolean flag) {
  if (flag==true) {
    mod.patch(tri.amplitude);    
  }
    else {                   
    mod.unpatch(tri); 
  }
}

void SINE2Modulation(float freq) {
  mod.setFrequency(freq);
}

void SINE2LFO(boolean flag) {
  if (flag==true) {
    mod.patch(sin2.amplitude);
  } else {                   
   
    mod.unpatch(sin2); 
   
  }  
}

void SAW2Modulation(float freq) {
  mod.setFrequency(freq);
}

void SAW2LFO(boolean flag) {
  if (flag==true) {
    mod.patch(saw2.amplitude);
    
  } else {                   
    mod.unpatch(saw2);     
  }  
}

void TRI2Modulation(float freq) {
  mod.setFrequency(freq);
}

void TRI2LFO(boolean flag) {
  if (flag==true) {
    mod.patch(tri2.amplitude);
    
  } else {             

    mod.unpatch(tri2);
  }  
}

void SINE3Modulation(float freq) {
  mod.setFrequency(freq);
}

void SINE3LFO(boolean flag) {
  if (flag==true) {

    mod.patch(sin3.amplitude);
    
  } else {                 

    mod.unpatch(sin3); 
  
  }  

}

void SAWModulation3(float freq) {
  mod.setFrequency(freq);
}

void SAW3LFO(boolean flag) {
  if (flag==true) {

    mod.patch(saw3.amplitude);
    
  } else {
    mod.unpatch(saw3); 
  }  
}

void TRIModulation3(float freq) {
  mod.setFrequency(freq);
}

void TRI3LFO(boolean flag) {
  if (flag==true) {

    mod.patch(tri3.amplitude);
    
  } else {                   
    mod.unpatch(tri3); 
  }  
}

//Modified code from midi library in minim 
void keyPressed()
{
  //Lower 
  if ( key == '`' ) midi.setMidiNoteIn( 40 );
  if ( key == 'z' ) midi.setMidiNoteIn( 42 );
  if ( key == 'x' ) midi.setMidiNoteIn( 44 );
  if ( key == 'c' ) midi.setMidiNoteIn( 45 );
  if ( key == 'v' ) midi.setMidiNoteIn( 47 );
  if ( key == 'b' ) midi.setMidiNoteIn( 49 );
  if ( key == 'n' ) midi.setMidiNoteIn( 51 );
  if ( key == 'm' ) midi.setMidiNoteIn( 52 );
  if ( key == ',' ) midi.setMidiNoteIn( 54 );
  if ( key == '.' ) midi.setMidiNoteIn( 56 );
  if ( key == '/') midi.setMidiNoteIn( 57 );
  
  //Middle
  if ( key == 'a' ) midi.setMidiNoteIn( 50 );
  if ( key == 's' ) midi.setMidiNoteIn( 52 );
  if ( key == 'd' ) midi.setMidiNoteIn( 54 );
  if ( key == 'f' ) midi.setMidiNoteIn( 55 );
  if ( key == 'g' ) midi.setMidiNoteIn( 57 );
  if ( key == 'h' ) midi.setMidiNoteIn( 59 );
  if ( key == 'j' ) midi.setMidiNoteIn( 61 );
  if ( key == 'k' ) midi.setMidiNoteIn( 62 );
  if ( key == 'l' ) midi.setMidiNoteIn( 64 );
  if ( key == ';' ) midi.setMidiNoteIn( 66 );
  if ( key == '\'') midi.setMidiNoteIn( 67 );
  
  //Higher
  if ( key == 'q' ) midi.setMidiNoteIn( 70 );
  if ( key == 'w' ) midi.setMidiNoteIn( 72 );
  if ( key == 'e' ) midi.setMidiNoteIn( 74 );
  if ( key == 'r' ) midi.setMidiNoteIn( 75 );
  if ( key == 't' ) midi.setMidiNoteIn( 77 );
  if ( key == 'y' ) midi.setMidiNoteIn( 79 );
  if ( key == 'u' ) midi.setMidiNoteIn( 81 );
  if ( key == 'i' ) midi.setMidiNoteIn( 82 );
  if ( key == 'o' ) midi.setMidiNoteIn( 84 );
  if ( key == 'p' ) midi.setMidiNoteIn( 86 );
  if ( key == '[') midi.setMidiNoteIn( 87 );
}
