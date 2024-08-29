# PatternAtlas

## License

Copyright (c) 2019 University of Stuttgart.

All rights reserved. This program and the accompanying materials
are made available under the terms of the [Eclipse Public License v1.0]
and the [Apache License v2.0] which both accompany this distribution,
and are available at http://www.eclipse.org/legal/epl-v10.html
and http://www.apache.org/licenses/LICENSE-2.0.

[Apache License v2.0]: http://www.apache.org/licenses/LICENSE-2.0.html
[Eclipse Public License v1.0]: http://www.eclipse.org/legal/epl-v10.html

## Quantum Computing Pattern Support

#### Latex Rendering

PatternAtlas supports inline LaTeX code rendering for quantum computing patterns.
This requires the setup of latex-renderer (https://github.com/UST-QuAntiL/latex-renderer).  
PatternAtlas supports Qcircuit and Quantikz circuit defintions. 
Simply copy your Qcircuit or Quantikz code into the content of a Pattern.

Qcircuit example:

```latex
\Qcircuit @C=1em @R=.7em {  
  & \ctrl{1} & \targ & \qw \\  
  & \targ & \ctrl{-1} & \qw  
  end}
```

***Note:** the "end" tag is __required__ to close the Qcircuit section in PatternAtlas*    

Quantikz example:  

```latex
\begin{quantikz}
  & \targ{} & \gate{U} & \qw \\  
  & \ctrl{1} \vqw{-1} & \meter{} \vcw{-1} \\  
  & \targ{} & \qw  
\end{quantikz}  
```

#### Discussion

PatternAtlas supports the Discussion of the rendered Qcircuit and Quantikz circuits. 
Simply click the "Comment Picture" button and mark an area within the circuit and then add your comment.
To answer on comments click the marked area and submit your comment.     

#### OpenQASM

PatternAtlas supports the Integration of OpenQASM Algorithms. The algorithm will get displayed as a graphical circuit.
Simply copy your OpenQASM code into the content of a Pattern. Make sure to add the __required__ "end" tag as shown in the example:  

```OpenQASM
OPENQASM 2.0;  
include "qelib1.inc";  
qreg q[2];  
h q[0];  
cx q[0], q[1]; end        
```
